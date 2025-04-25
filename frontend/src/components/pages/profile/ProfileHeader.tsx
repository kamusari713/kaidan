'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
import { useAuthorize } from '@/hooks/authentication'
import { useProfile, useUpdateProfile  } from '@/hooks/profile'
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Label, Textarea } from '@/components/ui'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { UserPublicProfile } from '@/types/profile'

export const ProfileHeader = ({ userId }: { userId: string }) => {
    const { userData, isLoading: credentialsIsLoading, isGuest } = useAuthorize()
    const { profileData, isLoading: profileIsLoading } = useProfile(userId)
	const updateMutation = useUpdateProfile(userId)

    const isLoading = credentialsIsLoading || profileIsLoading

    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    const settingsForm = useForm({
        defaultValues: {
            username: '',
            bio: '',
        },
    })

    useEffect(() => {
        if (isSettingsOpen && profileData) {
            settingsForm.reset({
                username: profileData.username,
                bio: profileData.bio.replace(/^["]|["]$/g, ''),
            })
        }
    }, [isSettingsOpen, profileData])

    const onSettingsSubmit = (data: UserPublicProfile) => {
		updateMutation.mutate(data)
        setIsSettingsOpen(false)
    }

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    return (
        <>
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex gap-4">
                    <div className="relative">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src="" alt="avatar"></AvatarImage>
                            <AvatarFallback>{profileData!.username}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex flex-col justify-start gap-2 pt-4">
                        <div>Имя пользователя: </div>
                        <div className="font-bold">{profileData!.username}</div>
                    </div>
                    <div className="flex flex-col justify-start gap-2 text-m pt-4">
                        <div>Биография:</div>
                        <div> {profileData!.bio}</div>
                    </div>
                    {profileData?.banned ? <p className="text-destructive">Забанен</p> : null}
                </div>
                {!isGuest && userData?.id === userId && (
                    <Button onClick={() => setIsSettingsOpen(true)}>Настройки</Button>
                )}
            </div>
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Настройки профиля</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={settingsForm.handleSubmit(onSettingsSubmit)}>
                        <div className="space-y-4">
                            <div>
                                <Label>Имя пользователя</Label>
                                <Input {...settingsForm.register('username')} />
                            </div>
                            <div>
                                <Label>Биография</Label>
                                <Textarea {...settingsForm.register('bio')} />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                                    Отмена
                                </Button>
                                <Button type="submit">Сохранить</Button>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

import { Button, Textarea } from '@/src/components/ui'
import { useUpdateProfileBio } from '@/src/hooks/profile'
import { useState } from 'react'

export const BioEditor = ({ initialValue, userId }: { initialValue: string; userId: string }) => {
	const [bio, setBio] = useState(initialValue)
	const { mutate } = useUpdateProfileBio(userId, bio)

	const handleSave = () => {
		mutate(bio)
	}

	return (
		<div className="flex flex-row gap-2 justify-center items-center mt-4">
			<Textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full text-sm p-2 border rounded" />
			<Button onClick={handleSave} className="mt-2">
				Сохранить
			</Button>
		</div>
	)
}

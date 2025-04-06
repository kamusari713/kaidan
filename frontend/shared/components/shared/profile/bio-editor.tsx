import { useUpdateBio } from '@/shared/hooks/profile'
import { useState } from 'react'
import { Button, Textarea } from '@/shared/components/ui'

export const BioEditor = ({ initialValue, userId }: { initialValue: string; userId: string }) => {
	const [bio, setBio] = useState(initialValue)
	const { mutate } = useUpdateBio(userId)

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

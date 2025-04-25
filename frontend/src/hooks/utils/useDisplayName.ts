interface DisplayNameProps<T> {
	status?: T | null
	labels: Record<string, string>
}

export const useDisplayName = <T extends string>({ status, labels }: DisplayNameProps<T>) => {
	if (!status) return null
	return labels[status] || null
}

export interface DeleteReceivers{
	delete(ids: string[]): Promise<number>
}
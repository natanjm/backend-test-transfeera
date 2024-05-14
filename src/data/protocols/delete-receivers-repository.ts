export interface DeleteReceiversRepository{
	delete(ids: string[]): Promise<number>
}
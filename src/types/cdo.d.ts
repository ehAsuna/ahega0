interface IMetadata {
	name: string
	level: `/projects/${"gamelab" | "applab"}`
	createdAt: string
	updatedAt: string
	id: string
	isOwner: boolean
	publishedAt?: string
	migratedToS3: boolean
	thumbnailUrl: string
	projectType: "applab" | "gamelab"
}


interface ISource {
	source: string
	html?: string
	/** will work on this later */
	libraries: never[]
}

export { IMetadata, ISource }
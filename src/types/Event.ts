class Event {
    id: number | null;
    name: string;
    description: string;
    location: string;
    datetime: Date;
    imageFileName: string;
    url: string;
    featured: boolean;
    entryPrice: string | null;

    constructor(eventData?: any) {
        this.id = eventData.id || null;
        this.name = eventData.name || null;
        this.description = eventData.description || null;
        this.location = eventData.location || null;
        this.datetime = new Date(eventData.datetime) || new Date();
        this.imageFileName = eventData.image_file_name || null;
        this.url = eventData.url || null;
        this.featured = eventData.featured || false;
        this.entryPrice = eventData.entry_price || null;
    }

    getImageSource = (): string => {
        return `assets/events/${this.imageFileName}`;
    };
}

export default Event;

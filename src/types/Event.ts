class Event {
    id: number | null;
    name: string;
    description: string;
    location: string;
    datetime: Date;
    imageFileName: string;
    url: string;
    featured: boolean;
    entryPrice: string;

    constructor(eventData?: any) {
        this.id = eventData.id || null;
        this.name = eventData.name || null;
        this.description = eventData.description || null;
        this.location = eventData.location || null;
        this.datetime = new Date(eventData.datetime) || new Date();
        this.imageFileName = eventData.image_file_name || null;
        this.url = eventData.url || null;
        this.featured = eventData.featured || false;
        this.entryPrice = eventData.entryprice || null;
    }
}

class SendEvent {
    id: number | null;
    name: string;
    description: string;
    location: string;
    datetime: Date;
    imageFileName: string;
    url: string;
    featured: boolean;
    entryPrice: string;

    constructor(eventData?: any) {
        this.id = eventData.id || null;
        this.name = eventData.name || null;
        this.description = eventData.description || null;
        this.location = eventData.location || null;
        this.datetime = eventData.datetime ? new Date(eventData.datetime) : new Date();
        if (!eventData.datetime) {
            this.datetime.setDate(this.datetime.getDate() + 1);
            this.datetime.setHours(18, 0, 0, 0);
        }
        this.imageFileName = eventData.imageFileName || null;
        this.url = eventData.url || null;
        this.featured = eventData.featured || false;
        this.entryPrice = eventData.entryPrice || null;
    }
}

export default Event;
export { SendEvent };

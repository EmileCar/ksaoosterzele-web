export const getImageSource = (imgpath) => {
    if (imgpath) {
        return `assets/events/${imgpath}`;
    }
    return 'assets/events/noImage.jpg';
};
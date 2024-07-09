import './Media.css';
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PageLayout from "../../layouts/PageLayout";
import CollageGallery from "../../components/collages/gallery/CollageGallery";
import MediaSearchOptions from '../../components/collages/MediaSearchOptions';
import { useCollageContext } from '../../contexts/CollageContext';

const Media = () => {
    const { ToggleMediaSearchButton } = useCollageContext();

    return (
        <PageLayout>
            <SectionTitle title="Foto en video">
                <p>Hier kun je een paar van de beste foto's zien die we tijdens onze vergaderingen of ons kamp nemen. De meeste foto's worden op Facebook gepost.</p>
            </SectionTitle>
            <div className="page__section--content">
                <ToggleMediaSearchButton />
                <MediaSearchOptions />
                <CollageGallery />
            </div>
        </PageLayout>
    );
}

export default Media;
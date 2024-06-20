import './Media.css';
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PageLayout from "../../layouts/PageLayout";
import CollageGallery from "../../components/collages/gallery/CollageGallery";
import { CollageProvider } from "../../contexts/CollageContext";

const Media = () => {

    return (
        <PageLayout>
            <SectionTitle title="Foto en video">
                <p>Hier kun je een paar van de beste foto's zien die we tijdens onze vergaderingen of ons kamp nemen. De meeste foto's worden op Facebook gepost.</p>
            </SectionTitle>
            <div className="page__section--content">
                <CollageProvider>
                    <CollageGallery />
                </CollageProvider>
            </div>
        </PageLayout>
    );
}

export default Media;
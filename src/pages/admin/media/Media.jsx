import SectionTitle from "../../../components/sectionTitle/SectionTitle";

const MediaAdmin = () => {

  const openAddMediaPopup = () => {
    //setPopup(<Popup title="Nieuwe collage"><MediaPopup /></Popup>);
  }

  return (
    <>
      <div className="admin__top">
        <SectionTitle title="Media beheren">
          <p>Maak hier nieuwe collages aan of pas bestaande collages aan.</p>
        </SectionTitle>
        <button onClick={() => openAddMediaPopup()} className="button button-admin inherit-font">+ Collage toevoegen</button>
      </div>
      {/* <MediaListAdmin/> */}
    </>
  );
};

export default MediaAdmin;
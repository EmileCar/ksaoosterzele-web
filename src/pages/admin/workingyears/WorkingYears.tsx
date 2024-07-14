import Button from "../../../components/button/Button";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import WorkingYearPopup from "../../../components/workingyears/popups/WorkingYearPopup";
import { usePopupContext } from "../../../contexts/PopupContext";
import useFetch from "../../../hooks/useFetch";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import { getWorkingYears } from "../../../services/workingYearService";
import WorkingYear from "../../../types/WorkingYear";

const WorkingYears = () => {
    const { pending, data: workingyears, error, refetch } = useFetch<WorkingYear[]>(getWorkingYears);
    const { registerPopup } = usePopupContext();

    const openCreatePopup = () => {
        registerPopup(<WorkingYearPopup />);
    }

    return (
        <>
            <SectionTitle title="Werkjaren beheren">
                <p>Bekijk de details van vorige werkjaren of start een nieuw werkjaar.</p>
            </SectionTitle>
            <div className="admin__actions">
                <Button text="+ Evenement toevoegen" onClick={openCreatePopup} hover/>
            </div>
            <FetchedDataLayout isPending={pending} error={error}>
                {workingyears && workingyears.length === 0 && (
                <p>
                    Er zijn nog geen werkjaren gestart.
                </p>
                )}
                <div className={`events-list events-list_admin`}>
                    {workingyears &&
                        workingyears.map((workingyear: WorkingYear) => (
                            <p>{workingyear.name}</p>
                    ))}
                </div>
            </FetchedDataLayout>
        </>
    );
}

export default WorkingYears;
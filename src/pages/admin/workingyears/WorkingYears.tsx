import Button from "../../../components/button/Button";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import WorkingYearPopup from "../../../components/workingyears/popups/WorkingYearPopup";
import { usePopupContext } from "../../../contexts/PopupContext";
import useFetch from "../../../hooks/useFetch";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import { getWorkingYears } from "../../../services/workingYearService";
import WorkingYear from "../../../types/WorkingYear";
import "./WorkingYears.css";

const WorkingYears = () => {
    const { pending, data: workingyears, error, refetch } = useFetch<WorkingYear[]>(getWorkingYears);
    const { registerPopup } = usePopupContext();

    const openCreatePopup = () => {
        registerPopup(<WorkingYearPopup />);
    }

    const currentWorkingYear = workingyears && workingyears.length > 0 ? workingyears.reduce((max, workingyear) => 
        (workingyear.startYear > (max.startYear ? max.startYear : 0) ? workingyear : max), workingyears[0]) : null;

    const otherWorkingYears = workingyears?.filter(workingyear =>
        workingyear.id !== currentWorkingYear?.id);

    return (
        <>
            <SectionTitle title="Werkjaren beheren" />
            <div className="admin__actions">
                <Button text="Start een nieuw werkjaar" onClick={openCreatePopup} hover/>
            </div>
            <FetchedDataLayout isPending={pending} error={error}>
                {workingyears && workingyears.length === 0 ? (
                <p>
                    Er zijn nog geen werkjaren gestart.
                </p>
                ) : (
                    <>
                        {currentWorkingYear && (
                            <div className="working-year-group">
                                <h3>Huidig werkjaar:</h3>
                                <div className="working-year-item current-working-year">
                                    <p>{currentWorkingYear.name}</p>
                                    <div className="working-year-item__info">
                                        <p><span className="pi pi-users"/>{currentWorkingYear.startYear}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className={`working-year-group`}>
                            {otherWorkingYears && otherWorkingYears.length > 0 && (
                                <h3>Vorige werkjaren:</h3>
                            )}
                            {otherWorkingYears &&
                                otherWorkingYears.map((workingyear: WorkingYear) => (
                                    <p key={workingyear.id}>{workingyear.name}</p>
                            ))}
                        </div>
                    </>
                )}
            </FetchedDataLayout>
        </>
    );
}

export default WorkingYears;
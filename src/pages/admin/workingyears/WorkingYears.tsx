import Button from "../../../components/button/Button";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import WorkingYearPopup from "../../../components/workingyears/popups/WorkingYearPopup";
import { usePopupContext } from "../../../contexts/PopupContext";
import useFetch from "../../../hooks/useFetch";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import { getWorkingYears } from "../../../services/workingYearService";
import WorkingYear from "../../../types/WorkingYear";
import { formatDate } from "../../../utils/datetimeUtil";
import "./WorkingYears.css";

const WorkingYears = () => {
    const { pending, data: workingyears, error, refetch } = useFetch<WorkingYear[]>(getWorkingYears);
    const { registerPopup } = usePopupContext();

    const openCreatePopup = () => {
        registerPopup(<WorkingYearPopup onClose={() => refetch()} />);
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
                                    <p className="name">{currentWorkingYear.name}</p>
                                    <div className="working-year-item__info">
                                        <p className="working-year-item__info-item"><span className="pi pi-users"/>{currentWorkingYear.registrationCount}</p>
                                        <p className="working-year-item__info-item"><span className="pi pi-crown"/>{currentWorkingYear.registrationCount}</p>
                                        <p className="working-year-item__info-item"><span className="pi pi-calendar"/>gestart op {formatDate(currentWorkingYear.createdAt)}</p>
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
                                    <div className="working-year-item current-working-year">
                                        <p className="name">{workingyear.name}</p>
                                        <div className="working-year-item__info">
                                            <p className="working-year-item__info-item"><span className="pi pi-users"/>{workingyear.registrationCount}</p>
                                            <p className="working-year-item__info-item"><span className="pi pi-crown"/>{workingyear.registrationCount}</p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </>
                )}
            </FetchedDataLayout>
        </>
    );
}

export default WorkingYears;
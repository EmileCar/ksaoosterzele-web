import SectionTitle from "../../components/sectionTitle/SectionTitle";
import useFetch from "../../hooks/useFetch";
import FetchedDataLayout from "../../layouts/FetchedDataLayout";
import PageLayout from "../../layouts/PageLayout";
import { getLeadersByRole } from "../../services/leaderService";
import Leader, { LeadersByRoleResult } from "../../types/Leader";

const Leaders = () => {
    const { pending, data, error } = useFetch<LeadersByRoleResult>(getLeadersByRole);

    return (
        <PageLayout>
            <SectionTitle title="Onze leiding">
                <p>
                    Onze leiding bestaat uit een groep enthousiaste vrijwilligers die elke zondag klaarstaan om leuke activiteiten te organiseren voor de kinderen. Naast een leidingsgroep zijn wij ook een hechte vriendengroep waardoor de sfeer elke keer weer top is!
                </p>
            </SectionTitle>
            <FetchedDataLayout isPending={pending} error={error}>
                {data && Object.keys(data).map(role => (
                    <div key={role}>
                        <h2>{role}</h2>
                        <div className="row">
                            {data[role].map((leader: Leader) => (
                                <div key={leader.id} className="col-12 col-md-6 col-lg-4">
                                    <div className="card">
                                        <img src={leader.imageFileName} className="card-img-top" alt={leader.firstName} />
                                        <div className="card-body">
                                            <h5 className="card-title">{leader.firstName} {leader.lastName}</h5>
                                            <p className="card-text">Geboortedatum: {leader.birthdate.toLocaleDateString()}</p>
                                            <p className="card-text">Telefoonnummer: {leader.phoneNumber}</p>
                                            <p className="card-text">E-mail: {leader.email}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </FetchedDataLayout>
        </PageLayout>
    );
}

export default Leaders;
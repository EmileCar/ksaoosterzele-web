import React, { useState } from 'react';
import Popup from '../../popup/Popup';
import FetchedDataLayout from '../../../layouts/FetchedDataLayout';
import { deleteCollageType, getCollageTypes, sendCollageType } from '../../../services/mediaService';
import CollageType from '../../../types/CollageType';
import useFetch from '../../../hooks/useFetch';
import LoadingSpinner from '../../loading/LoadingSpinner';

const CollageTypesPopup = () => {
    const { pending, data: collageTypes, error, refetch } = useFetch<CollageType[]>(getCollageTypes);
    const [editMode, setEditMode] = useState<number | null>(null);
    const [editName, setEditName] = useState<string>('');
    const [newType, setNewType] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState<string>('');
    const [isPending, setIsPending] = useState<{ [key: number]: boolean }>({});

    const handleEdit = (id: number) => {
        setEditName(collageTypes?.find((type) => type.id === id)?.name || '');
        setEditMode(id);
    };

    const handleDelete = async (id: number) => {
        setIsPending({ ...isPending, [id]: true });
        await deleteCollageType(id).then(() => refetch()).catch((error: any) => setDeleteError(error.message));
        setIsPending({ ...isPending, [id]: false });
    };

    const handleSaveEdit = async (id: number) => {
        setIsPending({ ...isPending, [id]: true });
        const newCollageType = new CollageType({ id, name: editName });
        await sendCollageType(newCollageType, "PUT").then(() => {
            setEditMode(null);
            refetch();
        });
        setIsPending({ ...isPending, [id]: false });
    };

    const handleCancelEdit = () => {
        setEditMode(null);
    };

    const handleAddType = async () => {
        if (newType) {
            const newCollageType = new CollageType({ name: newType });
            await sendCollageType(newCollageType, "POST").then(() => {
                setNewType('');
                refetch();
            });
        }
    };

    return (
        <Popup title="Collage Types beheren">
            {deleteError && <p className="error">{deleteError}</p>}
            <FetchedDataLayout isPending={pending} error={error}>
                <div className="collage-types">
                    {collageTypes && collageTypes.map((type: CollageType) => (
                        <div key={type.id} className="collage-type">
                            {editMode === type.id ? (
                                <input
                                    autoFocus
                                    type="text"
                                    className='inherit-font'
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                            ) : (
                                <p>{type.name}</p>
                            )}
                            <div className="collage-type-buttons">
                                {isPending[type.id!] ? (
                                    <LoadingSpinner size={22} />
                                ) : editMode === type.id ? (
                                    <>
                                        <span
                                            className="pi pi-check"
                                            onClick={() => handleSaveEdit(type.id!)}
                                        />
                                        <span
                                            className="pi pi-times"
                                            onClick={handleCancelEdit}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <span className="pi pi-pencil" onClick={() => handleEdit(type.id!)} />
                                        <span
                                            className="pi pi-trash"
                                            onClick={() => handleDelete(type.id!)}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="collage-type">
                        {newType != null ? (
                            <>
                                <input
                                    type="text"
                                    autoFocus
                                    className='inherit-font'
                                    value={newType}
                                    onChange={(e) => setNewType(e.target.value)}
                                    placeholder="Naam..."
                                />
                                <div className="collage-type-buttons">
                                    <span className="pi pi-check" onClick={handleAddType} />
                                </div>
                            </>
                        ) : (
                            <p
                                onClick={() => setNewType('')}
                                style={{ cursor: 'pointer', fontStyle: 'italic', textDecoration: 'underline' }}
                            >
                                + Type toevoegen
                            </p>
                        )}
                    </div>
                </div>
            </FetchedDataLayout>
        </Popup>
    );
};

export default CollageTypesPopup;

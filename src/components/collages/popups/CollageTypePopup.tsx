import React, { useState } from 'react';
import Popup from '../../popup/Popup';
import FetchedDataLayout from '../../../layouts/FetchedDataLayout';
import { deleteCollageType, getCollageTypes, sendCollage, sendCollageType } from '../../../services/mediaService';
import CollageType from '../../../types/CollageType';
import useFetch from '../../../hooks/useFetch';

const CollageTypesPopup = ({ onClose }: { onClose: () => void }) => {
    const { pending, data: collageTypes, error, refetch } = useFetch<CollageType[]>(getCollageTypes);
    const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
    const [editName, setEditName] = useState<string>('');
    const [newType, setNewType] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState<string>('');

    const handleEdit = (id: number) => {
        setEditName(collageTypes?.find((type) => type.id === id)?.name || '');
        setEditMode({ ...editMode, [id]: true });
    };

    const handleDelete = async (id: number) => {
        await deleteCollageType(id).then(() => refetch()).catch((error: any) => setDeleteError(error.message));

    };

    const handleSaveEdit = async (id: number) => {
        const newCollageType = new CollageType({ id, name: editName });
        await sendCollageType(newCollageType, "PUT").then(() => {
            setEditMode({ ...editMode, [id]: false });
            refetch();
        });
    };

    const handleCancelEdit = (id: number) => {
        setEditMode({ ...editMode, [id]: false });
    };

    const handleAddType = () => {
        if (newType) {
            const newCollageType = new CollageType({ name: newType });
            sendCollageType(newCollageType, "POST").then(() => {
                setNewType('');
                refetch();
            });
        }
    };

    return (
        <Popup title="Collage Types beheren" onClose={onClose}>
            {deleteError && <p className="error">{deleteError}</p>}
            <FetchedDataLayout isPending={pending} error={error}>
                <div className="collage-types">
                    {collageTypes && collageTypes.map((type: CollageType) => (
                        <div key={type.id} className="collage-type">
                            {editMode[type.id!] ? (
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
                                {editMode[type.id!] ? (
                                    <>
                                        <span
                                            className="pi pi-check"
                                            onClick={() => handleSaveEdit(type.id!)}
                                        />
                                        <span
                                            className="pi pi-times"
                                            onClick={() => handleCancelEdit(type.id!)}
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

import { useCallback } from 'react';

const useDeleteComponent = (deleteComponent: () => void) => {
    const handleRemove = useCallback(() => {
        deleteComponent();
    }, [deleteComponent]);

    return handleRemove;
}

export default useDeleteComponent
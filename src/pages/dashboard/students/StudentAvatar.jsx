import { Avatar, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import StudentView from './StudentView';

function StudentAvatar({ student }) {
    const [openModal, setOpenModal] = useState(false);

    const handleView = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ cursor: 'pointer' }}
                onClick={handleView}
            >
                <Avatar
                    alt={student.fullName}
                    src={`${import.meta.env.VITE_API_URL}/upload/${student.avatar}`}
                    sx={{ width: 40, height: 40 }}
                />
                <Typography>{student.fullName}</Typography>
            </Stack>
            <StudentView
                open={openModal}
                handleClose={handleCloseModal}
                student={student}
            />
        </>
    )
}

export default StudentAvatar

import React from "react";
import { Divider, Slide, Dialog, DialogActions, DialogContent, DialogTitle, Box } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useForm } from "react-hook-form";
import TextInputField from "../../components/form/TextInputField";
import { Group } from "../../models/group";
import { IUser } from "../auth/authSlice";
import { useAppSelector } from "../../app/hooks";
import CloseButton from "../../components/buttons/CloseButton";
import FormButton from "../../components/form/FormButton";
import * as GroupApi from "../../network/groups_api";
import { GroupInput } from "../../network/groups_api";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface IGroupDialogProps {
    open?: boolean,
    onDismiss: () => void,
    onGroupSaved: (group: Group) => void,
}

const SmallDialog = ({ open = true, onDismiss, onGroupSaved }: IGroupDialogProps) => {
    const user = useAppSelector((state) => state.auth.user) as IUser;

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<GroupInput>({
        defaultValues: {
            name: "",
        }
    });

    async function onSubmit(input: GroupInput) {
        try {
            const groupResponse = await GroupApi.createGroup(input, user.token);

            onGroupSaved(groupResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent): void => {
        if (e.code === "Escape") {
            onDismiss();
        }
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            onKeyDown={(e) => handleKeyDown(e)}
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
            }}
            maxWidth={false}
            PaperProps={{
                sx: {
                    width: "25vw",
                    minWidth: "300px",
                }
            }}
        >
            <DialogTitle display="flex" justifyContent="space-between" variant="h3" fontWeight={500} >
                Create Group
                <CloseButton size="large" sx={{ margin: "-15px -20px 0px 0px" }} onClick={onDismiss} />
            </DialogTitle>
            <Divider />
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Box display="flex" flexDirection="column">
                        <TextInputField
                            isFullWidth={true}
                            variant="outlined"
                            label="Name"
                            name="name"
                            inputProps={{ maxLength: 20 }}
                            size="small"
                            error={errors.name}
                            register={register}
                            registerOptions={{ required: "Required" }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <FormButton
                        label="CREATE GROUP"
                        isDisabled={isSubmitting}
                    />
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default SmallDialog;
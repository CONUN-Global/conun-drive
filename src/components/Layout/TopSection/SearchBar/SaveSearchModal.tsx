import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import Modal from "../../../Modal";
import FormInput from "../../../Form/HookForm/FormInput";
import Button from "../../../Button";

import getSavedSearches, {
  setSavedSearches,
} from "../../../../helpers/getSavedSearches";

import styles from "./SaveSearchModal.module.scss";

interface SaveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  search: string;
}

function SaveSearchModal({ isOpen, onClose, search }: SaveSearchModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    reset({ title: "" });
  }, [isOpen]);

  const currentSavedSearches = getSavedSearches() || [];

  const handleSave = (values) => {
    setSavedSearches([
      { title: values.title, search },
      ...currentSavedSearches,
    ]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className={styles.Form} onSubmit={handleSubmit(handleSave)}>
        <p className={styles.Title}>Name new saved search</p>
        <FormInput
          className={styles.Input}
          register={register("title", {
            required: { value: true, message: "Please input a title" },
          })}
          error={errors.title}
        />
        <div className={styles.ActionButtons}>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className={styles.Button}
          >
            Cancel
          </Button>
          <Button type="submit" className={styles.Button}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default SaveSearchModal;

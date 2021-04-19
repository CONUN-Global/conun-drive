import React from "react";
import { Controller, useForm } from "react-hook-form";

import FormInput from "../../components/Form/HookForm/FormInput";
import Dropzone from "../../components/Dropzone";
import FormTextArea from "../../components/Form/HookForm/FormTextArea";
import TagsSelect from "../../components/Select/TagsSelect";
import CategorySelect from "../../components/Select/CategorySelect";
import TypeSelect from "../../components/Select/TypeSelect";
import Button from "../../components/Button";

import styles from "./FileUpload.module.scss";

interface UploadFormData {
  title: string;
  file: File;
  thumbnail: File;
  description: string;
  tags: string[];
  category: string;
  type: string;
}

function FileUpload() {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<UploadFormData>();

  return (
    <div className={styles.FileUpload}>
      <p className={styles.Title}>Upload New Content</p>
      <form className={styles.Form}>
        <div className={styles.InputsBox}>
          <div className={styles.UploadSection}>
            <div className={styles.AddFileInput}>
              <p className={styles.InputLabel}>1. Add File</p>
              <Controller
                control={control}
                name="file"
                render={({ field: { onChange } }) => (
                  <Dropzone
                    className={styles.DropzoneFile}
                    onDrop={(file) => onChange(file)}
                    label="Drop your file"
                  />
                )}
              />
            </div>
            <div className={styles.AddThumbnailInput}>
              <p className={styles.InputLabel}>2. Add Thumbnail</p>
              <Controller
                control={control}
                name="thumbnail"
                render={({ field: { onChange } }) => (
                  <Dropzone
                    className={styles.DropzoneThumbnail}
                    onDrop={(file) => onChange(file)}
                    label="Drop your thumbnail"
                    withPreview
                  />
                )}
              />
            </div>
          </div>
          <div className={styles.ContentInfoSection}>
            <FormInput
              name="title"
              className={styles.Input}
              label="3. Content Title"
              register={register}
            />
            <FormTextArea
              className={styles.TextArea}
              name="description"
              label="4. Content Description"
              register={register}
            />
            <div className={styles.SelectContainer}>
              <p className={styles.InputLabel}>5. Add Tags</p>
              <TagsSelect
                onChange={(values) => console.log(values)}
                isMulti
                formatCreateLabel={(value) => `Add new ${value} tag`}
                placeholder=""
              />
            </div>
            <div className={styles.SelectContainer}>
              <p className={styles.InputLabel}>6. Select Category</p>
              <CategorySelect />
            </div>
            <div className={styles.SelectContainer}>
              <p className={styles.InputLabel}>6. Select Type</p>
              <TypeSelect />
            </div>
          </div>
        </div>
        <Button type="submit" className={styles.UploadButton}>
          Upload Content
        </Button>
      </form>
    </div>
  );
}

export default FileUpload;

import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "react-query";
import instance from "../../axios/instance";

import Button from "../../components/Button";

import FileCase from "./FileCase";

import styles from "./UserDetails.module.scss";
import BackIcon from "../../assets/icons/back.svg";
import UserInfo from "./UserInfo";

const LIMIT = "3";

function BackButton() {
  return (
    <div className={styles.BackButton}>
      <Button noStyle>
        <Link to="/">
          <BackIcon className={styles.Icon} />
        </Link>
      </Button>
    </div>
  );
}

function UserDetails() {
  const authorID = "67";

  const { data } = useQuery(["files", authorID], async () => {
    const formData = new FormData();
    formData.append("author", authorID);
    formData.append("order_by", "rate");
    formData.append("limit", LIMIT);
    const { data } = await instance.post("/content/get-contents-by", formData);
    return data.data;
  });

  console.log("USER DEETS: ", data);

  return (
    <div className={styles.Background}>
      <BackButton />
      <div className={styles.Layout}>
        <UserInfo />
        <FileCase title={"My Uploads"} data={data} />
        <FileCase title={"My Downloads"} />
      </div>
    </div>
  );
}

export default UserDetails;

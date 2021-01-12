import Head from "next/head";
import { useMutation, gql } from "@apollo/client";

import styles from "../styles/Home.module.css";

const SINGLE_UPLOAD = gql`
  mutation uploadItemFile($file: Upload!) {
    uploadItemFile(file: $file)
  }
`;

export default function Home() {
  const [upload, { loading, error }] = useMutation(SINGLE_UPLOAD, {
    onCompleted: data => console.log(data)
  });

  const handleFileChange = e => {
    const file = e.target.files[0];

    console.log(file);

    upload({ variables: { file } });
  };

  return (
    <div className={styles.container}>
      <input type="file" required onChange={handleFileChange} />
    </div>
  );
}

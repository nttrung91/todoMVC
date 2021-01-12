import Head from "next/head";
import { useMutation, gql } from "@apollo/client";

import styles from "../styles/Home.module.css";

const SINGLE_UPLOAD = gql`
  mutation($file: Upload!) {
    uploadItemFile(file: $file)
  }
`;

export default function Home() {
  const [upload, { loading, error }] = useMutation(SINGLE_UPLOAD);

  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }) => validity.valid && upload({ variables: { file } });

  return (
    <div className={styles.container}>
      <input type="file" required onChange={onChange} />
    </div>
  );
}

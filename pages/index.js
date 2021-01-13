import styles from "../styles/Home.module.css";
import { useUploadItemFileMutation } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

function Home() {
  const [upload] = useUploadItemFileMutation();

  const handleFileChange = e => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    upload({ variables: { file } });
  };

  return (
    <div className={styles.container}>
      <input type="file" required onChange={handleFileChange} />
    </div>
  );
}

export default withApollo({ ssr: false })(Home);

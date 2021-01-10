import Link from "next/link";

const FirstPost = () => {
  return (
    <div>
      <h1>First Post</h1>
      Back to{" "}
      <Link href="/">
        <a>home</a>
      </Link>
    </div>
  );
};

export default FirstPost;

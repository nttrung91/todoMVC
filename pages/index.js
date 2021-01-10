import Link from "next/link";

function HomePage() {
  return (
    <div>
      <h1>
        <img src="/icons/vercel.svg" alt="Vercel logo" className="logo" />
        E-Commerce Bulk Upload
      </h1>
      <h3>Other pages</h3>
      Navigate to{" "}
      <Link href="posts/first-post">
        <a>first-post</a>
      </Link>
    </div>
  );
}

export default HomePage;

import { useQuery } from "react-query";
import { useRouter } from "next/router";

// export async function getStaticPaths() {
//   const ids = [1, 2, 3];

//   return {
//     paths: ids.map((id) => ({
//       params: {
//         id: String(id),
//       },
//     })),
//     fallback: false,
//   };
// }

// export async function getStaticProps(context) {
//   const { id } = context.params;
//   const raw = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
//   const response = await raw.json();
//   const data = normalize(response);

//   return {
//     props: {
//       data,
//     },
//   };
// }

// export async function getServerSideProps(context) {
//   const { id } = context.params;
//   const raw = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
//   const response = await raw.json();
//   const data = normalize(response);

//   return {
//     props: {
//       data,
//     },
//   };
// }

export default function Pokemon() {
  const router = useRouter();
  const { query } = router;
  const { id } = query;
  const { data } = useQuery(id, async () => {
    const raw = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const response = await raw.json();
    return normalize(response);
  });

  return (
    <div style={{ padding: "20px" }}>
      {data?.name ? data.name : "Loading..."}
    </div>
  );
}

const normalize = (response = {}) => {
  const { name } = response;

  return {
    name,
  };
};

/* Data Fetching
  - apollo client
  - recoil
  - react-query
  - swr (nextjs)
*/

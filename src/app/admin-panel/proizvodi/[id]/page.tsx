export default async function ProductSlug({
  params,
}: {
  params: { id: number };
}) {
  return <div>{params.id}</div>;
}

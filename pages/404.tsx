import { HTag, PTag } from "components";
import { WithLayout } from "layout/Layout";

export function Error404(): JSX.Element {
  return (
    <>
      <HTag tag="h1">Ошибка 404</HTag>
      <PTag>Страница не найдена</PTag>
    </>
  );
}

export default WithLayout(Error404);
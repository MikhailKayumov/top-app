import { Button, HTag, PTag, Tag } from "../components";
import { Rating } from "../components/Rating/Rating";
import { useState } from "react";
import { WithLayout } from "../layout/Layout";

function Home(): JSX.Element {
  const [rating, setRating] = useState(0);

  return (
    <div style={{ padding: 10 }}>
      <HTag tag="h1">Title</HTag>
      <HTag tag="h2">Title</HTag>
      <HTag tag="h3">Title</HTag>
      <hr />
      <Button arrow="down" style={{ marginRight: 10 }}>Send</Button>
      <Button appearance="ghost" arrow="right">Send</Button>
      <hr />
      <PTag size="m">
        Студенты освоят не только hard skills, необходимые для работы
        веб-дизайнером, но и soft skills — навыки, которые позволят эффективно
        взаимодействовать в команде с менеджерами, разработчиками и
        маркетологами. Выпускники факультета могут успешно конкурировать с
        веб-дизайнерами уровня middle.
      </PTag>
      <br />
      <PTag size="s">
        Напишу сразу в двух курсах, так как проходил оба.
        Java будет многим непросвещённым сложновато в изучении, но здесь
        перевес из-за лидирующего положения языка как самого популярного
        в программировании. Выбор мой пал на эту профессию еще и потому,
        что Java-разработчики получают самую большую зарплату.
        Хотя Python начинает догонять Java по многим моментам,
        но вот в крупном екоме разработке Джава все-таки остается
        главенствующей сейчас. Скажу так – полнота программы и
        интенсивность присуща обоим курсам GeekBrains. Хочу отметить,
        что с первого дня занятий вы приступаете к практике и получаете
        опыт коммерческой разработки уже в свое резюме. Скажу вам как
        прошедший это – реально помогло в трудоустройстве!
      </PTag>
      <br />
      <PTag size="l">
        При завершении очередного проекта над графикой, специалист всегда
        задает себе вопрос о дальнейших перспективах. Отличие
        профессиональных дизайнеров заключается в том, что они гибкие.
        Сегодня разрабатывается логотип новой компании, а завтра вполне можно
        переключиться на иллюстрацию культовой книги.
      </PTag>
      <hr />
      <Tag size="m" color="green">Photoshop</Tag>
      <hr />
      <Rating rating={rating} isEditable setRating={setRating} />
    </div>
  );
}

export default WithLayout(Home);
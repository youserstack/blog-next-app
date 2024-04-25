import { handleSubmit } from "@/app/some/actions";
import { cookies } from "next/headers";

export default function Some() {
  // 서버액션함수에서는 폼데이터를 받아서 데이터베이스에 저장한다.
  // 그리고 저장된 데이터를 Some 페이지 서버 컴포넌트에서 데이터베이스에 연결하고 조회하여 가져온다.
  // 조회한 결과를 변수를 사용해 jsx에 넣어준다.
  // 서버액션은 서버컴포넌트를 새로고침해주지 않기 때문에 서버액션함수 내에서 revalidatePath를 통해서 트리거해주어야 한다.

  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();
  console.log({ allCookies });

  return (
    <main>
      <section>
        <h1>some page</h1>
        <form action={handleSubmit}>
          <input type="text" name="title" />
          <button type="submit">submit</button>
        </form>
      </section>
    </main>
  );
}

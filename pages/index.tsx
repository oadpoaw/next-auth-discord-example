import type { GetServerSideProps, NextPage } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button> <br />
        <Link href="/protected-clientside">Protected Client Side</Link>
        <br />
        <Link href="/protected-serverside">Protected Server Side</Link>
        <br />
        <pre>
          <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("discord")}>Sign in</button>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

export default Home;

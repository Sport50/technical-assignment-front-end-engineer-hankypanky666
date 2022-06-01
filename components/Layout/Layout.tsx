import { PropsWithChildren, ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "../../styles/Home.module.css";

export default function Layout({ children }: PropsWithChildren<any>) {
  return (
    <>
      <Navbar />
      <main className={styles.container}>{children}</main>
    </>
  );
}

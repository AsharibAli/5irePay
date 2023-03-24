import Head from "next/head";
import { Card } from "@material-tailwind/react";

import Navbar from "components/layout/navbar";
import Header from "components/layout/header";

import SectionFeatures from "components/sections/features";
import LeftSection from "components/sections/left-section";
import RightSection from "components/sections/right-section";

export default function Home() {
  return (
    <>
      <Head>
        <title>5irePay</title>
      </Head>
      <Navbar shadow />
      <main className="relative">
        <Header />
        <Card
          shadow={false}
          className="mx-6 -mt-20 bg-white md:mx-12 md:-mt-48"
        >
          <div className="container z-20 mx-auto px-4">
            <SectionFeatures />
            <LeftSection
              title="Extremely low fee"
              des="Are you a freelancer or a business man? Don't like paying 3-6% fee? Introducing 5irePay. It is as easy as paypal with extremely low (no) fee. We currently charges 0% fee."
              image="fee.png"
            />
            <RightSection
              title="Receive payments hassle-free."
              des="For receiving crypto payments you don't need to setup any external wallet, you can directly login with your google account hassle-free. We are on a mission to make people's life easy by abstracting conplex stuff."
              image="google.png"
            />
            <LeftSection
              title="Receive money across seas."
              des="You can receive money from your clients across seas in seconds, just by providing your email."
              image="international.png"
            />
            <RightSection
              title="Secure."
              des="5irePay is built with smart contracts on 5ire blockchain so everything is super secure and no one can manipulate your transactions."
              image="secure.jpg"
            />

            <LeftSection
              title="Receive money instantly."
              des="No waiting for many days for receiving your payments, receive your payments instantly unlike web2 compnies."
              image="speed.jpg"
            />
            <RightSection
              title="Withdraw your payments."
              des="For withdrawing you crypto you can add your exhchange account or withdraw directly in your bank account. Currently this is being development so for now you can withdraw money to your exchange address (or metamask address if you have)."
              image="metamask.png"
            />
          </div>
          <img
            className="absolute bottom-0 w-full md:-bottom-40"
            src="/img/pre-footer.jpg"
            alt="bubbles"
          />
        </Card>
      </main>
    </>
  );
}

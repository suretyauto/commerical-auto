import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Bolt, Globe, Scale, LucideIcon } from "lucide-react";
import LandingHeaderPic from "../assets/Landing.jpg";
import Zipcode from "@/form/Zipcode";

interface Feature {
  name: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    name: "Competitive Commercial Rates",
    description:
      "We shop with over 20 of our partnered carriers to bring you the most competitive and best price tailored just for you.",
    icon: Globe,
  },
  {
    name: "Getting A Quote Is Fast And Easy",
    description:
      "Fill out a form takes less than 3 minutes, it is quick and easy!",
    icon: Scale,
  },
  {
    name: "Get A Quote Fast",
    description:
      "Once you submit a form, one of our licensed agents will get in touch with you and let you know just how much you can save.",
    icon: Bolt,
  },
];

const FeatureCard: React.FC<Feature> = ({ name, description, icon: Icon }) => (
  <Card className="p-5 rounded-xl">
    <CardHeader className="flex flex-col items-center">
      <div className="flex items-center justify-center rounded-md">
        <Icon className="w-8 h-8" aria-hidden="true" />
      </div>
      <p className="mt-5 text-lg font-extrabold leading-6 text-dark-purple">
        {name}
      </p>
    </CardHeader>
    <CardBody className="mt-2 text-base text-dark-purple">
      {description}
    </CardBody>
  </Card>
);

const LandingPage: React.FC = () => {
  return (
    <div>
      <main className="lg:relative bg-background">
        <div className="w-full pb-20 mx-auto text-center max-w-7xl lg:py-48 lg:text-left">
          <div className="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline">Get Your Free</span> <br />
              <span className="block text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 xl:inline">
                Commercial Auto{" "}
              </span>
              Quote
            </h1>
            <p className="max-w-md mx-auto mt-3 text-lg sm:text-xl md:mt-5 md:max-w-3xl">
              Fill out a form in less than 3 minutes, and talk to an agent to
              get a quote tailored for you at a competitive price. Shopping for
              commerical auto insurance has never been easier.
            </p>
            <Zipcode />
          </div>
        </div>
        <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
          <img
            className="absolute inset-0 object-cover object-right w-full h-full"
            src={LandingHeaderPic}
            alt="Trucking"
          />
        </div>
      </main>

      <section className="bg-background py-36">
        <div className="max-w-xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="mb-12 text-4xl font-bold tracking-tight text-center sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.name} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <div className="elfsight-app-c43abc95-912b-4592-8284-6ee3d320a5a8 bg-input-purple"></div>
    </div>
  );
};

export default LandingPage;

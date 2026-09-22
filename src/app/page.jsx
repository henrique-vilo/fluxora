import CardHoverEffectDemo from "@/components/card-hover-effect-demo";
import FeaturesSectionDemo from "@/components/features-section-demo-2";
import InfiniteMovingCardsDemo from "@/components/infinite-moving-cards-demo";
import ParallaxHeroImagesDemo from "@/components/parallax-hero-images-demo";
import PointerHighlightDemo from "@/components/pointer-highlight-demo";
import NavbarDemo from "@/components/resizable-navbar-demo";
import Footer from "@/components/shadcn-space/blocks/footer-02/footer";
import SignupFormDemo from "@/components/signup-form-demo";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative w-full">
        <NavbarDemo/>
            <div className="w-full p-8 pt-8 mb-8">
              <ParallaxHeroImagesDemo/>
              <PointerHighlightDemo/>
              <FeaturesSectionDemo/>

              <div className="bg-accent w-full min-h-200 mt-10 rounded-3xl flex flex-col lg:flex-row justify-between">
                <div className="w-200 h-auto p-10 flex justify-center items-center">
                  <SignupFormDemo/>
                </div>
                <div className="min-w-100 max-w-250 h-auto p-10 flex justify-center items-center">
                  <img src="improve-teamwork.webp" className="w-full h-auto rounded-2xl"/>
                </div>
              </div>

              {/* benefits */}

              <div className="w-full h-auto flex flex-col mt-20">
                <div className="w-full min-h-50 flex flex-col lg:flex-row justify-between">
                  
                  <div className="pt-10 flex justify-center">
                    <h1 className="text-4xl font-bold tracking-tight text-neutral-800 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] md:text-6xl dark:text-neutral-100 dark:drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                      Inumerous Benefits. For Everyone.
                    </h1>
                  </div>

                  <div className="pt-10">
                    <AvatarGroup className="grayscale">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                        <AvatarFallback>LR</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/evilrabbit.png"
                          alt="@evilrabbit"
                        />
                        <AvatarFallback>ER</AvatarFallback>
                      </Avatar>
                      <AvatarGroupCount>+3</AvatarGroupCount>
                    </AvatarGroup>
                  </div>
                </div>
                <div className="">
                  <CardHoverEffectDemo/>
                </div>
                <div className="">
                  <InfiniteMovingCardsDemo/>
                </div>
              </div>
            </div>
            <Footer/>
      </div>
    </>
  );
}
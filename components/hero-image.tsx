import Image from "next/image"

export default function HeroImage() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-xl">
      <Image  
        src="/hero.jpg"
        alt="Mechanic helping a driver with car trouble"
        fill
        className="object-cover object-top rounded-xl" // ✅ Centers the important part of the image
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
    </div>
  )
}

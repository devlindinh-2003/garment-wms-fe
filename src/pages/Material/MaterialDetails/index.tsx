import { useState } from "react"
import { Star, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/Checkbox"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VariantTable from "./components/VariantTable"
import ImportRequestTable from "./components/ImportRequestTable"
import { Image } from "@radix-ui/react-avatar"
import VariantChart from "./components/VariantChart"

const MaterialDetails = () => {
    const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="container mx-auto p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Material Details</h1>
        <div className="space-x-2">
          <Button variant="secondary">Update Quantity</Button>
          <Button variant="secondary">Replenish</Button>
          <Button variant="secondary">Print Labels</Button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          <h2 className="text-2xl font-semibold">Vải đỏ ABC</h2>
          {/* <AspectRatio ratio={16 / 9} className="bg-muted">
      <Image
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Photo by Drew Beamer"
        fill
        className="h-full w-full rounded-md object-cover"
      />
    </AspectRatio> */}
          <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQIDBAUHCAb/xAA6EAACAQMCAwQJAQYHAQAAAAAAAQIDBBEFIQYSMQdBUaETIjJCYXGBkbEUQ1KywdHwFhcjM3JzghX/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBAYF/8QAMREBAAICAQIDBgQGAwAAAAAAAAECAxEEEiEFMUETQlFxkdEyYaHBFCIjgbHhM/Dx/9oADAMBAAIRAxEAPwDuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIyvEBlASAAAAAAAAAAAAAAAAAAAEOSQDKAZAnIFMpxgszkorxbwBj19SsbaHPXvKFOPjKokRuF64727RDRXvH3C9pjm1alUfhQjKr/CmZzmpHq66eG8q3lT69mgvu1zSKXMrOwvLmS6OSjTi/u2/IpPIj0h1U8Fzz+O0Q1NHthqyvIK40aELZtKfLXblFePs4ffsV/iJ35OifBK9Oovufk6ta3FK5t6VejLmp1IqUZLvTOqJ3G4fAtWaTNZ84XggAAAAAAAAAAAAAAAAAPh+NePFw1qcLClYq5qyp+kk3V5eXOy2wzHJl6PKH0+F4dHJrNptr+3m+Ou+1XW6iat7Wzt/DEXP8sxnkW9H1KeC4K/imZ/Rq7jtB4ouE86hGnt+ypKJSc1/i6a+FcSPda644m1+4WK2r3kl/wBmPwV67fFvXh8anlSGvr39/Wi41r+7qJ9VOtJ/zK7mfVpGOle8Vj6MXkjLeXrPxY+bTcp5f7QVMbLIJW5ospMOw9jvEP6zTqmi3Ev9e0XPRz71NvHk9vqjp49/def8Y42rRnr5T5/P/bpR0PigAAAAAAAAAAAAAAACG8Aefe1K5Vfju6rZ2t1Gi0u9cu/5OPLO7TD1HAx+zwY8nz+ktC4rOPhlfEwl9eKiRG1ohOAlDiEaU4CujAEYAplEnaswzOH9Wq6DrVrqNHL9FL14p+1B7Nfb8F626ZiWGfDGbHOOfV6Rsb2jfWVG7t5KdGtBThJd6Z3xO43DxmSlsd5pbzhkkqAAAAAAAAAAAAAAAFm4qKlTqVJNKMIuTb8MCZ1EyRG7aeYdZuJajd3V3LmzXqyqb9d3t5HzotudvcXxdOOKR6QpsanpKXLL24bMrbtLTjW6q6+DI5Sro0AEAcQjSlrBKNIwEDjlA0s1I7YfiWhnLqPY9xLlS0C7lvFOds3nL/ej9O46MF/dl8Dxfi7/AK9f7/d1Y6nwQAAAAAAAAAAAAAAD5ztCvP0PB+qVc4lOj6KOOuZtR/mZZp1SXd4bj9py6R+e/p3ef3FcuF0OCHsrRvzWKeKFws7Rn6rZee9XPX+nffpLYYMndCloEwhIlVJApaJQjARpONglbnEnakwppValrcUbihLlq0ZqpTljOJJ5T8i35s5rFo1by+70Rwfr0OItEoX0cKq1y1oL3Zrqjvx3667eN5nGnj5pp6enybwu5QAAAAAAAAAAAAAHOO2i9dPTLCwi8fqKzqT/AOMFt5vyObk27RD7vgWLeW2T4Rr6/wDjkzOR6VYuqfPTJiWOWu4ZFpV9NTUn7S2a+JW0abYL9Ud11oq1lDRKukMIQSGAJS2CdIkgrKxNFmUw+l7POJ/8O6yo15pWF01Gs37nhL+priydFvyl8/ncT+KxdvxR5fZ3yEublcWnFrKa7zueRmJidKwAAAAAAAAAAAAiQHFe1u9/VcUwt08wtqEY/DL3Zw8id309d4Ji6eP1fGf8PjMb7mD6uiS2BMMahL0Nzyv2an5LT3hhSei7ORm647kkCYUkqqWSgiBcS2IXiFMiVZhZmWZWWZbsll69nS+zDjRUOTRdXrtQbUbWrP3X+43+Psb4cmv5bPjeJcDrj22KO/r93Wo9dzredVAAAAAAAAAAACibUd30SA85a/ePUde1C7f7W4k18k8L8HzLTu0y99xcfssNKfCGEVbjINMa6g3FSj1W6L1lz5q9twyLWqqtLm7+/wCZW0altiv1VheKtVMkIRMKSVAJhUguSRKsrMkTDKYY9R43LMbLllbxvb+2tJVoUlXqxpupPpDLxllvmrN+mszHfT0dwzp9xpWk0LG6vZXlSksKrJYbXhv1wd1KzWNTLxnIzVzZZyVjW22LMQAAAAAAAAAA1XFN7/8AO4e1G7W0qVvNx+eNvMpknVJl0cTH7XkUp8ZedaccRWd/ifNe9nvKsABROOe7KEItDEtJujcypvpPp8y9u8OXHPs8nT6S2KZm7YkfQQmVBKh3ghUgttMgiWLUqwUl70vCJaKsLXiPXuszU6kowpp803hJbyefAmJhnbcttp3CHEN7KjG20ivitFuM6vqRwvFvdGkY7XcNudg489p3L0FoFC9ttHsqOp1I1LunRjGtOPRyx/e521iYrqXl8963y2tSNRtsSWQAAAAAAAAAAfDdr967fhaNrF4ld3EIf+V6z/hX3MORbVH1/BMfVyuqfSN/t+7ja6I4XrvJIQBG0PoEsK8hjE4e1Hc0r8HJniY/mhm29T0sIzXvr7MpMadGK/VWJXeuSrXaholEwo5l1Tz8ETpTqhlWun6hfQjKzs69WDnyqVOm2s46ZJisz5QrfNjx/wDJaIbOjwPxHd7x0uqvVypVZKKeH069S8Yrz6OPJ4lw6e/t9FpXZLfVailq17Tt6XNvC2WZNY23e3X4G1ePM/ifOzeN1iNYa/8Af3ff6DwdouhRTsrOLrerzVqrc5trv36fTBtTHWvk+NyObnz9r27fl2b5JpmjlVAAAAAAAAAAAABzjtd0jV9Uemz02yqXVGgqnPGk1zKTxvh/CPmc2elrTGn2vCeVhwRfrnvLlztL6KbqaffQws+tbT6fY55x2h6GvNwX96Fhy5JuE04zTw4yWGvoyupbRes94lKee/5EJTkHzUTjzRZaOyl67hj2LcKk6Lyl7SZe8bjbm49praayvK85q3o4Umo4/wBypsR0ajbT+K3fp1pTVqN4ScqmYp7bLIiC1/Te1NKFWUlzS5Y5yox/qRbyTi6pnvL0PwNQjR4R0qMcJO3jJ4XVtZO3FGqQ8l4pMzzMnzbzlyaODSsJAAAAAAAAAAAAAAAIay+oFLgns90/EDX33D2kahUdW9061rVJRcHOdJOXL4ZKzSs+cNqcjLjjVbTDAqcDcM1E09GtFnG8YcvT5efj3kTjpPo2jn8mO/XLGqdnXC9RtvT3HMs+pXnH6bPZfArOGk+jSPFeXHvfpDBq9lvD8opU6l9SfK1mNfOX47p9PsVnj0bV8a5UeevowLjsksnvbatdwkklF1KcZ4fe3jGR7CPi2r43fe70j/H3a247I7pczo6xQm87Kpbtbd26kyJwT6S1jxzH72P9f9MKt2W65TlincWNWPj6SUfp0Kzgt8WtfGePrymGN/lxxLTqRSt7WUXPDkrjosdehHsLStXxjjxPq6/w7aVdP0Kws7hRVWhQjTnyvKyljY6axqNPP8rNGbPfJHrMy2JZzgAAAAAAAAAAAAAAAAAAAAAAABGAHKBDimBKWEBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2Q==" alt="" />
        </div>


        <Tabs value={activeTab} onValueChange={setActiveTab} className="">
          <TabsList className="grid  grid-cols-7">
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="attributes">Attributes & Variants</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="product-type" className="flex items-center">
                  Material Type: Farbic
                </Label>
               
              </div>
              <div>
                <Label htmlFor="product-type" className="flex items-center">
                  Material Code: RFR0001
                </Label>
               
              </div>
              <div>
                <Label htmlFor="invoicing-policy" className="flex items-center">
                  Unit of measure: Meter
                </Label>
              </div>
              <div className="col-span-2">
                {/* <Label htmlFor="track-inventory" className="flex items-center">
                  Track Inventory <Info className="w-4 h-4 ml-1 text-gray-400" />
                </Label> */}
                <div className="flex items-center mt-2">
                  <Label htmlFor="track-inventory" className="">Quantity: 123 unit</Label>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  The quantity is based on the actual import not the delivery order.
                </p>
              </div>
            </div>
          </TabsContent>
          {/* Add other TabsContent for remaining tabs */}
          <TabsContent value="attributes">
            <VariantTable/>
          </TabsContent>
          <TabsContent value="inventory">
            <ImportRequestTable/>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4">
          <VariantChart/>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">INTERNAL NOTES</h3>
          <textarea
            className="w-full p-2 border rounded-md"
            rows={3}
            placeholder="This note is only for internal purposes."
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default MaterialDetails
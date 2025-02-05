import { ClockIcon, EnvelopeOpenIcon, HomeIcon, PersonIcon } from "@radix-ui/react-icons"
import H from "./H&F/Header"
import F from "./H&F/Footer"
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";


function HubungiKami() {
    function onChange(value) {
        console.log("Captcha value:", value);
      }

    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs
        .sendForm('service_uxiap21', 'template_uvgemwe', form.current, {
          publicKey: 'KyhF_q4FVQ4lmpUZD',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    };
    return (
        <>
        <H/>
        <address className="my-[10px]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13473.67183371726!2d106.44935339809386!3d-6.0810119807775775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e41feb95b3495c7%3A0xe5c317cfcd6d77cd!2sKoperasi%20Wiyata%20Mandala!5e0!3m2!1sid!2sid!4v1728309068065!5m2!1sid!2sid" width="100%" height="450" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </address>
        <div className="grid grid-cols-2 justify-items-center mt-[10px]">
            <form ref={form} onSubmit={sendEmail} className=" w-[580px] h-[610px] ml-[220px]">
            <input placeholder="Name" type="text" name="from_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full h-[50px] p-6 shadow-lg"/>
            <input type="email" name="user_email" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full h-[50px] p-6 mt-[10px] shadow-lg " placeholder="Email@kamu.com"/>
            {/* <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 ml-[24px]">Kami tidak akan menyebarkan informasi anda Read our <a href="#" class="font-medium text-blue-600 hover:underline">Privacy Policy</a>.</p> */}
            <textarea name="message" rows="4" class="block pl-[24px] pt-[10px] w-full h-[315px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 mt-[10px] shadow-lg " placeholder="Pesan kamu"></textarea>
            <ReCAPTCHA className="mt-[10px]" sitekey="6Ldps10qAAAAADPpGKobiJUmRsBlI9BSprYQFll5" onChange={onChange}/>
            <button className="bg-blue-500 hover:bg-blue-800 text-white w-full h-[50px]  font-bold mt-[10px]  px-2 rounded">Kirim</button>

            </form>
            <div className="bg-gradient-to-b from-[#4AA1B4] to-[#57C1A0] w-[580px] h-[610px] mr-[220px]">
                <h1 className="text-[50px] ml-[40px]">INFORMASI <hr class="my-6 border-gray-200  dark:border-gray-700" /></h1>
                <div className="flex items-center  my-[40px]"> 
                    <PersonIcon className="mx-[30px]" style={{ width: '80px', height: '80px' }} /> 085814197494
                </div>
                <div className="flex items-center  my-[40px]">
                    <EnvelopeOpenIcon className="mx-[30px]" style={{ width: '80px', height: '80px' }}/> nikolasfebriann@gmail.com
                </div>
                <div className="flex items-center  my-[40px]">
                    <HomeIcon className="mx-[30px]" style={{ width: '80px', height: '80px' }}/> Jln. Balaraja - Kronjo Desa Pasilian RT 3 RW 3
                </div>
                <div className="flex items-center my-[40px]">
                    <ClockIcon className="mx-[30px]" style={{ width: '80px', height: '80px' }}/>08.00 - 17.00 WIB
                </div>
            </div>
        </div>
        <F/>
        </>
    )
}

export default HubungiKami

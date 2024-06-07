import { Link } from "react-router-dom";

function Footer() {

  return (
    <div className="bg-light-green w-full text-gray flex flex-row items-center justify-between h-[150px] p-6">
      <Link to='/'>
        <img src="/images/henry.svg" alt="Henry Meds" className='cursor-pointer h-[40px]'/>
      </Link>

      <div className="flex flex-col items-center text-dark-gray gap-2">
        <h3 className='font-bold'>Questions?</h3>
        <div className="flex flex-row gap-1">
          <p>Call: <span className='text-green'>(909) 787-2342</span></p>
          <p>Email: <span className='text-green'>Ask@HenryMeds.com</span></p>
        </div>
      </div>

      <div className='flex flex-row gap-1'>
        <Link to="https://www.facebook.com/TryHenryMeds" target="_blank">
          <img src="/images/henryFacebook.svg" alt="Henry Meds" width={22.5} height={22.5}/>
        </Link>
        <Link to="https://www.instagram.com/gethenrymeds/" target="_blank">
          <img src="/images/henryInstagram.svg" alt="Henry Meds" width={22.5} height={22.5} />
        </Link>
        <Link to="https://www.linkedin.com/company/henry-meds/" target="_blank">
          <img src="/images/henryLinkedIn.svg" alt="Henry Meds" width={22.5} height={22.5} />
        </Link>
      </div>
    </div>
  );
};

export default Footer;

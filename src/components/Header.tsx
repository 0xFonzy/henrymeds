import { Link } from "react-router-dom";


function Header() {

  return (
    <div className="bg-white w-full flex flex-row items-center justify-between min-h-[80px] p-6">
      <Link to='/'>
        <img src="/images/henry.svg" alt="Henry Meds" className='cursor-pointer h-[40px]'/>
      </Link>
    </div>
  );
};

export default Header;

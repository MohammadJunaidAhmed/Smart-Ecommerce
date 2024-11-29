import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';

const FOOTER_SECTIONS = [
    {
        section: 'Company',
        categories: [
            {category: 'About Us', link: ''},
            {category: 'Delivery Information', link: ''},
            {category: 'Privacy Policy', link: ''},
            {category: 'Terms & Conditions', link: ''},
            {category: 'Contact Us', link: ''},
            {category: 'Support Center', link: ''},
            {category: 'Careers', link: ''},
        ]
    },
    {
        section: 'Company',
        categories: [
            {category: 'Account', link: ''},
            {category: 'Delivery Information', link: ''},
            {category: 'Privacy Policy', link: ''},
            {category: 'Terms & Conditions', link: ''},
            {category: 'Contact Us', link: ''},
            {category: 'Support Center', link: ''},
            {category: 'Careers', link: ''},
        ]
    },
    {
        section: 'Corporate',
        categories: [
            {category: 'About Us', link: ''},
            {category: 'Delivery Information', link: ''},
            {category: 'Privacy Policy', link: ''},
            {category: 'Terms & Conditions', link: ''},
            {category: 'Contact Us', link: ''},
            {category: 'Support Center', link: ''},
            {category: 'Careers', link: ''},
        ]
    },
    {
        section: 'Popular',
        categories: [
            {category: 'About Us', link: ''},
            {category: 'Delivery Information', link: ''},
            {category: 'Privacy Policy', link: ''},
            {category: 'Terms & Conditions', link: ''},
            {category: 'Contact Us', link: ''},
            {category: 'Support Center', link: ''},
            {category: 'Careers', link: ''},
        ]
    },
]

const SOCIAL_MEDIA_LINKS = [
    {
        name: 'instagram',
        link: 'https://www.instagram.com/',
        image: ''
    },
    {
        name: 'facebook',
        link: 'https://www.instagram.com/',
        image: ''
    },
    {
        name: 'x',
        link: 'https://www.instagram.com/',
        image: ''
    },
    {
        name: 'linkedin',
        link: 'https://www.instagram.com/',
        image: ''
    },
]

const icons = {
    'instagram': <InstagramIcon/>,
    'facebook': <FacebookIcon/>,
    'x': <XIcon/>,
    'linkedin': <LinkedInIcon/>
}

const CONTACT_DETAILS = [
    {
        'title': 'Adress',
        'value': "VIT-AP University, Amaravathi",
        'logo': <PlaceOutlinedIcon/>
    },
    {
        'title': 'Call Us',
        'value': "(+91) XXX XXX XXXX",
        'logo': <HeadphonesOutlinedIcon/>
    },
    {
        'title': 'Email',
        'value': "vshop@vshop.com",
        'logo': <MailOutlinedIcon/>
    },
    {
        'title': 'Hours',
        'value': "10:00 - 18:00, Mon-Sat",
        'logo': <QueryBuilderOutlinedIcon/>
    },
    
]

const FooterNew = () => {
  return (
    <div className="flex flex-col px-2">
        <div className="flex">
            <div className="w-32 flex-1 flex flex-col justify-between py-3">
                <div className='flex flex-col gap-2'>
                    <div className=''>
                        {/* <img src='image.png' className='h-20'/>  */}
                        <h1 className='text-xl py-2 font-serif cursor-pointer bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>V-SHOP</h1>
                        {/* TODO: ADD LOGO HERE */}
                    </div>
                    <h1 className='text-sm text-gray-500'>Smart E-Commerce Website</h1>
                </div>
                <div className='flex flex-col gap-2 pr-2'>
                    {
                        CONTACT_DETAILS.map((contact,index)=>{
                            return (
                                <div key={index} className='flex gap-2 pr-2'>
                                    {contact.logo}
                                    <h1 className='text-sm tracking-wider'> <span className='font-bold'>{contact.title}</span>: {contact.value}</h1>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                FOOTER_SECTIONS.map((section, index)=>{
                    return (
                        <div key={index} className="flex-1">
                            <h1 className="text-lg font-bold py-3">{section.section}</h1>
                            <div className="flex flex-col gap-3">
                                {
                                    section.categories.map((category, index)=>{
                                        return (
                                            <h1 key={index} className=" cursor-pointer duration-500 hover:text-green-600 hover:translate-x-3">{category.category}</h1>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className="mt-4 p-3 border-t border-gray-900/10 flex justify-between items-center">
            <p className="text-xs leading-5 text-gray-500">&copy; 2024 V-Shop, Inc. All rights reserved.</p>
            <div className='flex gap-3 items-center'>
                <h1 className='px-2 text-lg'>Follow Us</h1>
                {
                    SOCIAL_MEDIA_LINKS.map((socialMedia, index)=>{
                        return (
                            <button key={index} className='px-1 h-10 w-10 rounded-full bg-emerald-500 text-white text-lg duration-300 hover:bg-gray-900'>
                                {icons[socialMedia.name]}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default FooterNew
'use client';
import {useState} from 'react';
import Container from '@/components/shared/containers/Container';
import {PROFILE_TABS} from '@/constants/profile';
import {TabKey} from '@/types/profile';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('profile');

  const ActiveComponent = PROFILE_TABS[activeTab].component;

  return (
    <div className='flex-center w-full'>
      <Container>
        <div className='my-6 flex gap-10'>
          <div className='w-[20%]'>
            <div className='flex flex-col gap-4 p-4 rounded-md bg-gray-50 sticky top-8'>
              <header className='font-semibold text-primary text-2xl text-center w-full'>
                User Profile
              </header>
              <div className='flex flex-col'>
                {(Object.keys(PROFILE_TABS) as TabKey[]).map((tab) => {
                  const {icon: Icon, label} = PROFILE_TABS[tab];
                  return (
                    <div
                      className={`border-b-1 border-gray-300 text-lg py-5 hover:text-accent transform duration-150 items-center ${tab === activeTab ? 'text-accent' : 'text-primary'} cursor-pointer`}
                      onClick={() => setActiveTab(tab)}
                    >
                      <h2 className='flex gap-3 items-center'>
                        <span>
                          <Icon />
                        </span>
                        {label}
                      </h2>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='w-[80%]'>{<ActiveComponent />}</div>
        </div>
      </Container>
    </div>
  );
};

export default UserProfile;

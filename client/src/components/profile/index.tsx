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
            <div className='flex flex-col gap-4 px-6 py-3 rounded-md bg-gray-50 sticky top-8 shadow-sm'>
              <div className='flex flex-col'>
                {(Object.keys(PROFILE_TABS) as TabKey[]).map((tab) => {
                  const {icon: Icon, label} = PROFILE_TABS[tab];
                  return (
                    <div
                      className={`border-b border-gray-200 last:border-b-0 py-4 items-center hover:text-accent/90 transform duration-150 ${tab === activeTab ? 'text-accent' : 'text-primary'} cursor-pointer`}
                      onClick={() => setActiveTab(tab)}
                      key={tab}
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

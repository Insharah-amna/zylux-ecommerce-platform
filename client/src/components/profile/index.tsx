'use client';
import {useState} from 'react';
import {useSearchParams} from 'next/navigation';
import Container from '@/components/shared/containers/Container';
import {PROFILE_TABS} from '@/constants/profile';
import {TabKey} from '@/types/profile';

const UserProfile = () => {
  const searchParams = useSearchParams();

  const tab = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState<TabKey>(tab as TabKey);

  const ActiveComponent = PROFILE_TABS[activeTab].component;

  return (
    <div className='flex-center w-full'>
      <Container>
        <div className='my-6 flex flex-col md:flex-row gap-6 md:gap-10'>
          {/* Desktop sidebar */}
          <div className='hidden md:block md:w-[20%]'>
            <div className='flex flex-col gap-4 px-6 py-3 rounded-md bg-gray-50 sticky top-8 shadow-sm'>
              <div className='flex flex-col'>
                {(Object.keys(PROFILE_TABS) as TabKey[]).map((tabKey) => {
                  const {icon: Icon, label} = PROFILE_TABS[tabKey];
                  return (
                    <div
                      className={`border-b border-gray-200 last:border-b-0 py-4 items-center hover:text-accent/90 transform duration-150 ${tabKey === activeTab ? 'text-accent' : 'text-primary'} cursor-pointer`}
                      onClick={() => setActiveTab(tabKey)}
                      key={tabKey}
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

          {/* Mobile horizontal tabs */}
          <div className='md:hidden flex gap-2 overflow-x-auto pb-2 -mx-4 px-4'>
            {(Object.keys(PROFILE_TABS) as TabKey[]).map((tabKey) => {
              const {icon: Icon, label} = PROFILE_TABS[tabKey];
              return (
                <div
                  className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                    tabKey === activeTab
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => setActiveTab(tabKey)}
                  key={tabKey}
                >
                  <Icon className='text-sm' />
                  {label}
                </div>
              );
            })}
          </div>

          {/* Active tab content */}
          <div className='w-full md:w-[80%]'>{<ActiveComponent />}</div>
        </div>
      </Container>
    </div>
  );
};

export default UserProfile;

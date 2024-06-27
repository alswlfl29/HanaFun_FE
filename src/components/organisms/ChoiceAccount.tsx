import { FC, useEffect, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { ModalBottomContainer } from './ModalBottomContainer';

type accountType = {
  accountId: number;
  accountName: string;
  accountNumber: string;
  balance: number;
};

interface IProps {
  accounts: accountType[];
  selectedAccountId: (idNumber: number) => void;
}

export const ChoiceAccount: FC<IProps> = ({ accounts, selectedAccountId }) => {
  const [selectedAccount, setSelectedAccount] = useState<accountType>({
    accountId: accounts[0].accountId,
    accountName: accounts[0].accountName,
    accountNumber: accounts[0].accountNumber,
    balance: accounts[0].balance,
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleChangedAccount = (account: accountType) => {
    setSelectedAccount(account);
    selectedAccountId(account.accountId);
    setShowModal(false);
  };

  useEffect(() => {
    selectedAccountId(accounts[0].accountId);
  }, []);

  return (
    <>
      {showModal && (
        <ModalBottomContainer
          color='#FFFFFF'
          onClose={() => setShowModal(false)}
        >
          <h3 className='font-hanaBold text-lg'>계좌선택</h3>
          <div className='w-full'>
            <hr />
            <div className='max-h-60 overflow-y-auto scrollbar-hide px-6 py-2'>
              {accounts.map((account, index) => (
                <div key={account.accountId} className='mt-4'>
                  <div
                    className='flex justify-between items-end mb-2'
                    onClick={() => handleChangedAccount(account)}
                  >
                    <div className='flex flex-col items-start justify-center text-hanaSilver text-xs font-hanaRegular gap-0.5'>
                      <p className='font-hanaMedium text-sm text-black'>
                        {account.accountName}
                      </p>
                      하나 {account.accountNumber}
                    </div>
                    <p className='font-hanaMedium text-sm'>
                      {account.balance.toLocaleString()}원
                    </p>
                  </div>
                  {index !== accounts.length - 1 && <hr />}
                </div>
              ))}
            </div>
          </div>
        </ModalBottomContainer>
      )}
      <div
        key={selectedAccount.accountId}
        className='flex justify-between items-center bg-[#F1F1F1] rounded-md px-4 py-2'
        onClick={() => setShowModal(true)}
      >
        <div className='flex flex-col items-start'>
          <p className='flex items-center justify-center gap-1 font-hanaMedium text-base text-black'>
            <img src='/images/hana_logo.svg' alt='hana_logo' className='w-5' />
            {selectedAccount.accountName + '\n'}
          </p>
          <p className='ml-6 font-hanaRegular text-[0.75rem] text-hanaSilver'>
            하나 {selectedAccount.accountNumber}
          </p>
        </div>
        <div className='flex flex-col items-end gap-1'>
          {showModal ? (
            <MdKeyboardArrowUp
              size={24}
              className='cursor-pointer mt-1.5'
              onClick={() => setShowModal(false)}
            />
          ) : (
            <MdKeyboardArrowDown size={24} className='cursor-pointer mt-1.5' />
          )}
          <p className='font-hanaMedium text-sm'>
            {selectedAccount.balance.toLocaleString()}원
          </p>
        </div>
      </div>
    </>
  );
};

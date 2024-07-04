import { FC, useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { ModalBottomContainer } from './ModalBottomContainer';

interface IProps {
  accounts: AccountType[];
  isSelectBtn: boolean;
  selectedAccount?: (accountInfo: AccountType) => void;
}

export const ChoiceAccount: FC<IProps> = ({
  accounts,
  selectedAccount,
  isSelectBtn,
}) => {
  const [selectedAccountInfo, setSelectedAccountInfo] = useState<AccountType>({
    accountId: accounts[0].accountId,
    accountName: accounts[0].accountName,
    accountNumber: accounts[0].accountNumber,
    balance: accounts[0].balance,
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleChangedAccount = (account: AccountType) => {
    setSelectedAccountInfo(account);
    setShowModal(false);
  };

  useEffect(() => {
    if (selectedAccount) selectedAccount(accounts[0]);
  }, []);

  return (
    <>
      {isSelectBtn && showModal && (
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
        className='flex justify-between items-center bg-[#F1F1F1] rounded-md px-4 py-3 mx-5'
        onClick={() => setShowModal(true)}
      >
        <div className='flex flex-col items-start'>
          <p className='flex items-center justify-center gap-1 font-hanaMedium text-base text-black'>
            <img src='/images/hana_logo.svg' alt='hana_logo' className='w-5' />
            {selectedAccountInfo.accountName + '\n'}
          </p>
          <p className='ml-6 font-hanaRegular text-[0.75rem] text-hanaSilver'>
            하나 {selectedAccountInfo.accountNumber}
          </p>
        </div>
        <div className='flex flex-col items-end gap-1'>
          <MdKeyboardArrowDown
            size={24}
            className={`cursor-pointer ${!isSelectBtn && 'hidden'}`}
          />
          <p className={`font-hanaMedium text-sm ${!isSelectBtn && 'mt-5'}`}>
            {selectedAccountInfo.balance.toLocaleString()}원
          </p>
        </div>
      </div>
    </>
  );
};

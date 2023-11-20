import { useLayoutEffect, useRef, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { getAmount, getColorClass } from '../../utils/helper';
import { MdOutlineStarPurple500, MdOutlineStarOutline } from "react-icons/md"
import { DynamicIcon } from '../customIcon/DynamicIcon';
import Pagination from './pagination/Pagination';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CustomTable({ coins, pagination, setPagination }) {
  const checkbox = useRef()
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState([])

  useLayoutEffect(() => {
    const isIndeterminate = selectedCoin.length > 0 && selectedCoin.length < coins.length
    setChecked(selectedCoin.length === coins.length)
    setIndeterminate(isIndeterminate)
    checkbox.current.indeterminate = isIndeterminate
  }, [selectedCoin])

  function toggleAll() {
    setSelectedCoin(checked || indeterminate ? [] : coins)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  const startIndex = (pagination.page - 1) * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const visibleCoins = coins.slice(startIndex, endIndex);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto text-start mt-8">
          <h1 className="text-base font-bold md:text-[35px] text-[25px]leading-6 text-gray-600">Coin Listing</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the available Coins in the crypto market including their Price, volume and market cap.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="relative">
              <table className="min-w-full table-fixed text-start divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        ref={checkbox}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    <th scope="col" className="px-4 py-3.5  text-start text-sm font-semibold text-gray-900">
                      #
                    </th>
                    <th scope="col" className=" py-3.5 text-start text-sm font-semibold text-gray-900">
                      Coin
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-end text-sm font-semibold text-gray-900">
                      price
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-end text-sm font-semibold text-gray-900">
                      Low 24h
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-end text-sm font-semibold text-gray-900">
                      High 24h
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-end text-sm font-semibold text-gray-900">
                      Price Change 24h
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-end text-sm font-semibold text-gray-900">
                      24h Volume
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-end text-sm font-semibold text-gray-900">
                      Market Cap
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {visibleCoins.map((coins, index) => (
                    <tr key={index} className={selectedCoin.includes(coins) ? 'bg-gray-50' : undefined}>
                      <td className="relative px-7 sm:w-12 sm:px-6">
                        <div
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded cursor-pointer"
                          onClick={() =>
                            setSelectedCoin(
                              selectedCoin.includes(coins)
                                ? selectedCoin.filter((p) => p !== coins)
                                : [...selectedCoin, coins]
                            )
                          }
                        >
                          {selectedCoin.includes(coins) ? (
                            <MdOutlineStarPurple500 className="text-gray-600" />
                          ) : (
                            <MdOutlineStarOutline className="text-gray-400" />
                          )}
                        </div>
                      </td>
                      <td
                        className={classNames(
                          'whitespace-nowrap py-4 text-sm font-medium',
                          selectedCoin.includes(coins) ? 'text-gray-600' : 'text-gray-900'
                        )}
                      >
                        {startIndex + index + 1}
                      </td>
                      <td className="whitespace-nowrap  py-8 text-sm text-gray-500 text-start flex "><img src={coins?.image} alt='' width={25} height={25} className='mr-2' /> <span className='mt-1'>{coins?.name}</span></td>

                      <td className="whitespace-nowrap  py-4 text-sm text-gray-500 text-end ">
                        <div className={`flex ${coins.current_price >= 0.9 ? 'justify-between' : 'justify-end'}`}>
                          {coins.current_price >= 0.9 ? (
                            <span className='border-2 border-[#92f192] text-[#92f192] rounded-lg px-2 py-0.9 mr-6'>Buy</span>
                          ) : (" ")}
                          <span>${getAmount(coins.current_price)}</span>
                        </div>
                      </td>

                      <td className={`whitespace-nowrap px-3 py-4 text-sm text-end ${getColorClass(coins.low_24h, 1.0, 'text-green-500', 'text-red-500')}`}>
                        <div className="flex justify-end items-center">
                          <DynamicIcon
                            percentage={coins.low_24h}
                            threshold={1.0}
                            greenIcon={<AiFillCaretUp />}
                            redIcon={<AiFillCaretDown />}
                          />
                        </div>
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm text-end ${getColorClass(coins.high_24h, 1.0, 'text-green-500', 'text-red-500')}`}>
                        <div className="flex justify-end items-center">
                          <DynamicIcon
                            percentage={coins.high_24h}
                            threshold={1.0}
                            greenIcon={<AiFillCaretUp />}
                            redIcon={<AiFillCaretDown />}
                          />
                        </div>
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm text-end ${getColorClass(coins.day, 0.4, 'text-green-500', 'text-red-500')}`}>
                        <div className="flex justify-end items-center">
                          <DynamicIcon
                            percentage={coins.price_change_24h}
                            threshold={0.4}
                            greenIcon={<AiFillCaretUp />}
                            redIcon={<AiFillCaretDown />}
                          />
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-end">${getAmount(coins.total_volume)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-end">${getAmount(coins.market_cap)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {pagination.total ? (
        <div
          className={`w-full mb-10 mt-3 px-4 py-3 rounded-b-lg bg-[#F9F9F9] `}
        >
          <div className="md:flex mr-3 md:justify-between text-center md:items-center text-[#9A9EA5]">
            <p className="text-sm" style={{ color: "var(--C_blue_light)" }}>
              Showing{" "}
              <span className="text-[#52525B]">
                {Math.min(pagination.length, pagination.total) ||
                  pagination.pageSize}
              </span>{" "}
              {pagination.total > 1 ? "results" : "result"} of{" "}
              <span className="text-[#52525B]"> {pagination.total}</span>{" "}
              {pagination.total > 1 ? "records" : "record"}
            </p>

            <Pagination
              {...{
                pagination,
                page: pagination.page - 1,
                itemsPerPage: pagination.pageSize,
                setPagination,
                total: pagination.total,
              }}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}
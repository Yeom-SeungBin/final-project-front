import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import AuthContext from '../../../../../util/AuthContext';
import { TestRvContext } from './TestRvContext';

const ReviewMap = () => {
  const { review, setReview } = useContext(TestRvContext);
  const { role } = useContext(AuthContext); // 관리자 확인용
  const [filterPhoneNumber, setFilterPhoneNumber] =
    useState(''); // 전화번호 필터링
  const [filteredReview, setfilteredReview] = useState([]); // 필터링된 리뷰

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const response = await fetch(
          'http://localhost:8181/admin/review',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReview(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [setReview]);

  // 날짜 / 시간 작성일
  const formatRentTime = (rentTime) => {
    const date = new Date(rentTime);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: 'numeric',
      hour12: true,
    });
  };

  // ?글자 이상 시 ... 처리
  const truncateText = (text, length) => {
    if (!text) {
      return '';
    }
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  // 전화번호 뒷자리 4개로 필터링
  useEffect(() => {
    if (filterPhoneNumber.length === 4) {
      const filtered = review.filter((e) =>
        e.phoneNumber.endsWith(filterPhoneNumber),
      );
      setfilteredReview(filtered);
    } else {
      setfilteredReview(review);
    }
  }, [filterPhoneNumber, review]);

  // 회원이 작성한 리뷰 목록
  const AdminContents = ({ reviews }) => {
    return (
      <>
        {reviews.map((e) => (
          <div className='list-body' key={e.reviewNo}>
            <div className='res-no'>{e.reviewNo}</div>
            <div className='res-user-name'>
              <div>{e.name}</div>
              <div>{e.email}</div>
            </div>
            <div className='res-selected-ad'>
              {e.carName && e.carName.length > 1
                ? truncateText(e.carName, 14)
                : e.stationName && e.stationName.length > 1
                  ? truncateText(e.stationName, 14)
                  : null}
            </div>
            <div className='res-selected-name'>
              {truncateText(e.content, 35)}
            </div>
            <div className='res-selected-time'>
              <div>{formatRentTime(e.updateDate)}</div>
            </div>
            <button
              className='res-cancel-btn'
              // onDoubleClick={() =>
              //   handleCancelReservation(e.reservationNo)
              // }
            >
              삭제
            </button>
          </div>
        ))}
      </>
    );
  };

  // 본체
  return (
    <>
      {role === 'ADMIN' && review.length > 0 ? (
        <AdminContents reviews={filteredReview} />
      ) : (
        <div
          style={{
            textAlign: 'center',
            marginTop: '100px',
            fontSize: '1.5rem',
          }}
        >
          작성된 리뷰가 없습니다.
        </div>
      )}
      <input
        className='phone-last-four'
        type='text'
        placeholder='전화번호 뒷자리 4개 입력'
        value={filterPhoneNumber}
        onChange={(e) =>
          setFilterPhoneNumber(e.target.value)
        }
        maxLength='4'
      />
    </>
  );
};

export default ReviewMap;

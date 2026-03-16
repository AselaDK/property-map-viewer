import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { propertyService } from '../services/api/propertyApi';
import { Property } from '../types/property';
import { PropertyDetails } from '../components/properties/PropertyDetails';
import { Button } from '../components/common/Button';
import { Spinner } from '../components/common/Spinner';
import { Alert } from '../components/common/Alert';
import toast from 'react-hot-toast';

export const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      navigate('/404');
      return;
    }

    const fetchProperty = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await propertyService.getPropertyById(Number(id));
        setProperty(data);
      } catch (err) {
        const message = 'Failed to load property details';
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id, navigate]);

  const handleViewOnMap = () => navigate('/');
  const handleBack = () => navigate(-1);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <Spinner size="lg" />
        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Loading Listing…</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 py-12 px-6">
        <Alert variant="error" title="Listing error">
          {error || 'This property could not be found.'}
        </Alert>
        <div className="text-center">
          <Button variant="primary" onClick={() => navigate('/')} className="h-14 px-10 rounded-[20px] font-bold shadow-lg">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <button
          onClick={handleBack}
          className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white shadow-soft border border-slate-100 text-slate-500 hover:text-slate-900 transition-all hover:scale-[1.02]"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          <span className="text-sm font-bold uppercase tracking-widest">Back to map</span>
        </button>
      </div>

      <div className="bg-white rounded-[40px] shadow-soft-lg border border-slate-100 overflow-hidden">
        <PropertyDetails
          property={property}
          isOpen={true}
          onClose={handleBack}
          onViewOnMap={handleViewOnMap}
          embedded
        />
      </div>
    </div>
  );
};
